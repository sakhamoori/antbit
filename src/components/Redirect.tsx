import { useRouter } from "next/router"
import { useEffect } from "react"
import { Url } from "url"

type RedirectProps = {
  to: Url
}

function Redirect({ to }: RedirectProps) {
  const router = useRouter()

  useEffect(() => {
    router.push(to)
  }, [to]);

  return null;
}

export default Redirect