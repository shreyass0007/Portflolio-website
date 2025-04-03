"use client"

import { motion } from "framer-motion"

const techStack = [
  {
    name: "React",
    icon: (
      <svg viewBox="0 0 24 24" className="text-[#61DAFB]" fill="currentColor">
        <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg viewBox="0 0 24 24" className="text-[#3178C6]" fill="currentColor">
        <path d="M3 3h18v18H3V3zm10.71 12.71l.29-.3V16h-2v-1h1.29l-.3-.29A4.002 4.002 0 0 1 12 8a4 4 0 0 1 4 4h2a6 6 0 0 0-6-6 6 6 0 0 0-6 6 6 6 0 0 0 6 6 5.997 5.997 0 0 0 1.71-.29z"/>
      </svg>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <svg viewBox="0 0 24 24" className="text-foreground" fill="currentColor">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>
      </svg>
    ),
  },
  {
    name: "TailwindCSS",
    icon: (
      <svg viewBox="0 0 24 24" className="text-[#06B6D4]" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    ),
  },
]

export function TechStackAnimation() {
  return (
    <div className="relative w-full h-full">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background rounded-3xl" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating tech icons */}
      <div className="relative w-full h-full flex items-center justify-center">
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            className="absolute"
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              x: [0, 20, 0, -20, 0][index % 5],
              y: [0, -20, 0, 20, 0][index % 5],
              scale: 1,
              rotate: [0, 10, 0, -10, 0][index % 5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          >
            <div className="relative w-20 h-20 bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center group">
              <motion.div
                className="w-12 h-12"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {tech.icon}
              </motion.div>
              
              {/* Tooltip */}
              <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                {tech.name}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Center circle */}
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-primary/5 backdrop-blur-sm"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-primary/50"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-primary/30"
          animate={{ scale: [1.5, 1, 1.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  )
}
