import { motion, useMotionValue, useTransform } from "framer-motion"

// variants
const stairAnimation = {
  "initial": {
    top: "0%",
  },
  "animate": {
    top: "100%",
  },
  "exit": {
    top: ["100%", "0%"],
  }
}

const anim = () => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants: stairAnimation,
  }
}


// calcula o index reverso para os degraus diminuir gradativamente
const reverseIndex = (index) => {
  const totalSteps = 6
  return totalSteps - index - 1
}

const Stairs = () => {
  return (
    <>
      {/* 
      Renderiza 6 divs de movimento, cada uma representa um degrau da escada. 
      Cada div irá ter a mesma animação definida pelo objeto stairAnimation.
      O delay de cada div é calculado "sinamically" baseada na sua index reversa,
      criando um efeito de degraus, diminuindo gradativamente para cada degrau
    */}
      {[...Array(6)].map((_, index) => {
        return (
          <motion.div
            key={index}
            {...anim()}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              delay: reverseIndex(index) * 0.1
            }}
            className="h-full w-full bg-white relative"
          />
        )
      })}
    </>
  )
}

export default Stairs