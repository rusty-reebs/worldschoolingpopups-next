import { useEffect } from "react";
import Nav from "@/components/components/Nav";
// import { supabaseAdmin } from "@/components/supabase";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { customTheme } from "@/components/utilities/customTheme";

export default function Admin() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/admin/manage");
    }
  }, [user]);

  if (!user)
    return (
      <>
        <Nav />
        <div className="flex w-full">
          <div className="bg-white p-10 rounded-lg mx-auto">
            <Auth
              supabaseClient={supabaseClient}
              appearance={{ theme: customTheme }}
              providers={[]}
              redirectTo="http://localhost:3000/admin/manage"
            />
          </div>
        </div>
      </>
    );
}
