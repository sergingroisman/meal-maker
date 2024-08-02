"use client"

import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { MdDeliveryDining } from "react-icons/md"
import { LuRefreshCw } from "react-icons/lu"
import { motion } from "framer-motion"

const AlertRefresh = () => {
  return (
    <Alert>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MdDeliveryDining className="h-5 w-5 text-primary" />
          <div>
            <p className="text-base font-medium">Rastreio de Pedidos</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default" size="md" className="rounded-full hover:bg-primary">
            <motion.div
              className="block"
              animate={{
                rotate: [120, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <LuRefreshCw className="h-5 w-5" />
            </motion.div>
            <span className="pl-2">Verificar</span>
          </Button>
        </div>
      </div>
    </Alert>
  )
}

export default AlertRefresh