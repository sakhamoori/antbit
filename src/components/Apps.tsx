// import { DropdownOptions } from "flowbite"
import { Dropdown } from "flowbite-react"
// import { useEffect, useState } from "react"

// import { forwardRef } from "react"
// import Link from "next/link"
// import { Url } from "next/dist/shared/lib/router/router"

// type AppsProps = {
//   href: Url,
//   children: any
// }

// const MyLink = forwardRef((props: AppsProps, _ref: any) => {
//   let { href, children } = props
//   return (
//     <Link href={href}>
//       {children}
//     </Link>
//   )
// })

type AppsProps = {
  changeState: any,
  selected: string
}

const Apps = ({changeState, selected }: AppsProps) => {
  console.log(selected)
  return (
    <div className="flex items-center gap-4">
      <Dropdown label="Select Apps">
        <Dropdown.Item value={'miners'} onClick={() => changeState('miners')}>Miners</Dropdown.Item>
        <Dropdown.Item value={'eng'} onClick={() => changeState('eng')}>Engineering</Dropdown.Item>
      </Dropdown>
    </div>
    
  )
}

export default Apps