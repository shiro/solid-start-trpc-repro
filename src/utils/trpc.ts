import { QueryClient } from "@tanstack/solid-query";
import type { IAppRouter } from "~/server/trpc/router/_app";
import { httpBatchLink } from "@trpc/client";
import { createTRPCSolid } from "solid-trpc";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // replace example.com with your actual production url
  if (process.env.NODE_ENV === "production") return "https://example.com";
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const trpc = createTRPCSolid<IAppRouter>();

export const makeQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
        },
    },
});

export const makeTrpcClient = (req?: Request) => trpc.createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
