import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ctx}) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async ({ctx}) => {
    await inngest.send({
      name: "test.process-task",
      data: {
        "email": "hello@gmail.com"
      }
    })

    //
    return prisma.workflow.create({
      data: {
        name: "test-workflow"
      },
    });
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;