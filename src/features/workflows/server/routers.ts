
import { PAGINATION } from "@/config/constant";
import { NodeType } from "@/generated/prisma/enums";
import prisma from "@/lib/db";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { Node, Edge } from "@xyflow/react";
import { Noto_Sans_Wancho } from "next/font/google";
import {generateSlug } from "random-word-slugs";
import z from "zod";

export const workflowsRouter = createTRPCRouter({
    create: premiumProcedure.mutation(({ctx}) => { 
            return prisma.workflow.create({
                data: {
                    name: generateSlug(3),
                    userId: ctx.auth.user.id,
                    nodes: {
                        create: {
                            type: NodeType.INITIALS,
                            position: { x: 0, y: 0 },
                            name: NodeType.INITIALS
                        }
                    }
                }
            });
    }),
    delete: protectedProcedure
            .input(z.object({id: z.string()}))
            .mutation(({ctx, input}) => {
            return prisma.workflow.delete({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id
                }
            })
    }),
    updateName: protectedProcedure
            .input(z.object({id: z.string(), name: z.string().min(1)}))
            .mutation(({ctx, input}) => {
                return prisma.workflow.update({
                    where: {
                        id: input.id,
                        userId: ctx.auth.user.id
                    },
                    data: {name: input.name}
                });
            }),
    getOne: protectedProcedure
            .input(z.object({id: z.string()}))
            .query(async ({ctx, input}) => {
                const workflow = await prisma.workflow.findUnique({
                    where: {
                        id: input.id,
                        userId: ctx.auth.user.id,
                    },
                    include: {nodes: true, connections: true},
                });
                if (!workflow) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Workflow not found or access denied.",
                    });
                }
                //Transforming nodes from database into react overflow nodes
                const nodes: Node[] = workflow.nodes.map((node) => ({
                    id: node.id,
                    type: node.type,
                    position: node.position as {x: number, y: number},
                    data: (node.data as Record<string, unknown>) || {}
                }));

                //Transforming connection from database to react-flow edges
                const edges: Edge[] = workflow.connections.map((c) => ({
                    id: c.id,
                    source: c.fromNodeId,
                    target: c.toNodeId,
                    sourceHandle: c.fromOutput,
                    targetHandle: c.toInput
                }));
               return {
                id: workflow.id,
                name: workflow.name,
                nodes,
                edges
               }
            }),
    getMany: protectedProcedure
            .input(
                z.object({
                    page: z.number().default(PAGINATION.DEFAULT_PAGE),
                    pageSize: z.number().default(PAGINATION.DEFAULT_PAGE_SIZE),
                    search: z.string().default("")
                })
            )
            .query(async({ctx, input})=> {
                const { page, pageSize, search } = input;
  
                const [items, totalCount] = await Promise.all([
                    prisma.workflow.findMany({
                        skip: (page - 1) * pageSize,
                        take: pageSize,
                        where: {
                            userId: ctx.auth.user.id,
                            name: {
                                contains: search,
                                mode: "insensitive"
                            }
                        },
                        orderBy: {
                            updatedAt: "desc"
                        }
                    }),
                    prisma.workflow.count({
                        where: {
                            userId: ctx.auth.user.id,
                            name: {
                                contains: search,
                                mode: "insensitive"
                            }
                        },
                    }),
                ]);
                const totalPages = Math.ceil(totalCount/pageSize);
                const hasNextPage = page < totalPages;
                const hasPreviousPage = page > 1;
                return {
                    items,
                    page,
                    pageSize,
                    totalCount,
                    totalPages,
                    hasNextPage,
                    hasPreviousPage
                }
            })
})