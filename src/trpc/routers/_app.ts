
import { createTRPCRouter} from '../init';

import { TRPCError } from '@trpc/server';
import { workflowsRouter } from '@/features/workflows/server/routers';

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;