import auth from '@/lib/auth';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
 

export const createTRPCContext = async (opts: { headers: Headers }) => {
  // const user = await auth(opts.headers);
  return { userId: 'user_123' };
};
 

const t = initTRPC
  .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create({
    /**
     * @see https://trpc.io/docs/server/data-transformers
     */
    // transformer: superjson,
  });
 
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async({ctx, next}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(!session){
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "UNAUTHORIZED"
    });
  }
  return next({ctx: {...ctx, auth: session }});
})