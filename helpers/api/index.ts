import { NextApiRequest, NextApiResponse } from "next/types";

export const withErrorMiddleware =
  (handler: any) =>
  async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
    try {
      await handler(req, res);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  };
