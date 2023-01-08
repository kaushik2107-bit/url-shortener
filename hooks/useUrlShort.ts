import { supabase } from "../lib/supabase";
import { nanoid } from "nanoid";

export const useUrlShort = () => {
  const buildUrl = async (url: string) => {
    const uid = nanoid(6);
    await supabase.from("urls").insert([{ id: uid, url: url }]);
    return uid;
  };

  return { buildUrl };
};
