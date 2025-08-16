import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="h-[36vh] w-full border-b border-green-400 relative bg-gray-800 scanlines overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-green-900/20"></div>
      </div>
      
      {/* Terminal-style background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0, 255, 127, 0.1) 1px, transparent 1px),
              linear-gradient(180deg, rgba(0, 255, 127, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-8">
        <div className="space-y-4">
          {/* Brand name with glitch effect */}
          <div className="relative">
            <Heading
              level="h1"
              className="text-5xl leading-tight text-green-400 font-mono font-bold uppercase tracking-wider glitch"
              data-text="fdh Systems"
            >
              fdh Systems
            </Heading>
          </div>
          
          {/* Tagline with RGB split effect */}
          <div className="relative">
            <Heading
              level="h2"
              className="text-2xl leading-relaxed text-blue-400 font-mono font-normal uppercase tracking-widest"
              data-text="Specializing in repairs, refurbishes, and mods. "
            >
              Specializing in repairs, refurbishes, and mods. 
            </Heading>
          </div>
          
          {/* Terminal-style description */}
          <div className="mt-8 pb-4 p-4 bg-gray-800/50 border border-green-400/30 font-mono text-sm text-green-300">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-xs ml-2">fdh_systems.exe</span>
            </div>
            <div className="font-mono text-sm flex flex-col items-center">
              <div>
                <span className="text-green-400">$</span> <span className="neon-blue">fdh_systems</span> <span className="text-white">--init</span>
                <br />
              </div>

              <div className="text-left">
                <span className="text-white"><span className="text-green-400 mr-2 font-semibold">[OK]</span>Hardware repair module online</span>
                <br/>
                <span className="text-white"><span className="text-green-400 mr-2 font-semibold">[OK]</span>Modding services active</span>
                <br/>
                <span className="text-white"><span className="text-green-400 mr-2 font-semibold">[OK]</span>Secure shipping protocols loaded</span>
                <br/>
                <span className="text-white"><span className="text-green-400 mr-2 font-semibold">[OK]</span>30-day warranty enabled</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Animated elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-10 right-10 w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </div>
  )
}

export default Hero