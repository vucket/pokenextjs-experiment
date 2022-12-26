import type { NextApiRequest, NextApiResponse } from "next";
import { ApiMethod } from "../../model/api";
import { fetchHelper } from "../../client";
import { withErrorMiddleware } from "../../helpers/api";
import { POKE_API_HOST, POKE_API_PATH_POKEMON } from "../../constants";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === ApiMethod.GET) {
    const fullUrl = `${POKE_API_HOST}${POKE_API_PATH_POKEMON}pikachu`;
    const searchRes = await fetchHelper(fullUrl, {
      method: ApiMethod.GET,
    });
    res.status(200).json(searchRes);
  }
  res.redirect("/404");
};

export default withErrorMiddleware(handler);
