import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { convertSegmentPathToStaticExportFilename } from 'next/dist/shared/lib/segment-cache/segment-value-encoding';
 
export const appRouter = createTRPCRouter({
  getUsers:protectedProcedure.query(async({ctx}) => {
    console.log({userId: ctx.auth.user.id})
    return prisma.user.findMany({
      where: {
        id: ctx.auth.user.id
      }
    }); 
  })
});
 
// export type definition of API
export type AppRouter = typeof appRouter;