import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { CiSquarePlus } from "react-icons/ci"

const AdminDishTable = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bolos da vovó Tereza</h1>
        <Button variant="outline" className="flex items-center">
          <CiSquarePlus className="mr-2" />
          Adicionar um item
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Serves</TableHead>
            <TableHead>Day of Week</TableHead>
            <TableHead>Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <img
                src="https://static.ifood-static.com.br/image/upload/t_medium/pratos/eb7a1375-b519-45c8-b9ca-d6260acf223b/202208201920_107C_i.jpg"
                alt="Bolo cremoso de Maizena"
                className="w-12 h-12 rounded"
                width="50"
                height="50"
                style={{ aspectRatio: "50/50", objectFit: "cover" }}
              />
            </TableCell>
            <TableCell>Bolo cremoso de Maizena</TableCell>
            <TableCell>$10.00</TableCell>
            <TableCell>Delicious creamy cake made with Maizena</TableCell>
            <TableCell>8</TableCell>
            <TableCell>Monday</TableCell>
            <TableCell>
              <Switch id="active1" defaultChecked />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminDishTable

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}