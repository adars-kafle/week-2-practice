declare module "prompt-sync" {
  export default function (options?: {
    sigint: boolean;
  }): (question: string) => string;
}
