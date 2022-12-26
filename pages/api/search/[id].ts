import type { NextApiRequest, NextApiResponse } from "next";
import { ApiMethod } from "../../../model/api";
import { fetchHelper } from "../../../client";
import { withErrorMiddleware } from "../../../helpers/api";
import { POKE_API_HOST, POKE_API_PATH_POKEMON } from "../../../constants";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { id } = req.query;
  if (req.method === ApiMethod.GET) {
    const fullUrl = `${POKE_API_HOST}${POKE_API_PATH_POKEMON}${id}`;
    const searchRes = await fetchHelper(fullUrl, {
      method: ApiMethod.GET,
    });
    res.status(200).json(searchRes);
  } else {
    res.redirect("/404");
  }
};

export default withErrorMiddleware(handler);
