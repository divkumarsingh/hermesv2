import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation( async() => {
    await inngest.send({
      name: "execute/ai"
    });
    return {success: true, message: "Job queued"}
  }),
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