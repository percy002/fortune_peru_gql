import { ChildMenuItems, NodeChildItem } from "."

type Props = {
    submenu : ChildMenuItems[]
}
export default function Submenu({submenu} : Props) {
  return (
    <div className="flex flex-col">
      <img src="images/mapi.jpg" alt="" />
      <h4>machupicchu</h4>
    </div>
  )
}
