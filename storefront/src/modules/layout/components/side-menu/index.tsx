"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-blue-400 font-mono uppercase tracking-wide text-sm border border-transparent hover:border-blue-400/30 px-2 py-1"
                >
                  [Menu]
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <PopoverPanel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-green-100 m-2 backdrop-blur-2xl font-mono">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-gray-800/95 border border-green-400/30 justify-between p-6 relative overflow-hidden"
                    style={{
                      boxShadow: '0 0 50px rgba(0, 255, 127, 0.2), inset 0 0 50px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {/* Background grid effect */}
                    <div className="absolute inset-0 opacity-10">
                      <div 
                        className="w-full h-full"
                        style={{
                          backgroundImage: `
                            linear-gradient(90deg, rgba(0, 255, 127, 0.2) 1px, transparent 1px),
                            linear-gradient(180deg, rgba(0, 255, 127, 0.2) 1px, transparent 1px)
                          `,
                          backgroundSize: '30px 30px'
                        }}
                      ></div>
                    </div>

                    {/* Terminal header */}
                    <div className="flex justify-between items-center border-b border-green-400/30 pb-4 mb-6 relative z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-400 ml-2">nav_menu.exe</span>
                      </div>
                      <button 
                        data-testid="close-menu-button" 
                        onClick={close}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200 p-1"
                      >
                        <XMark className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Menu items */}
                    <ul className="flex flex-col gap-6 items-start justify-start relative z-10">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name} className="w-full">
                            <LocalizedClientLink
                              href={href}
                              className="text-3xl leading-10 hover:text-blue-400 transition-all duration-300 uppercase tracking-wider font-bold block relative group py-2"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              <span className="relative z-10">
                                &gt; {name}
                              </span>
                              {/* Glitch effect on hover */}
                              <span className="absolute inset-0 text-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 transform group-hover:translate-x-1">
                                &gt; {name}
                              </span>
                              <span className="absolute inset-0 text-red-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-150 transform group-hover:-translate-x-1">
                                &gt; {name}
                              </span>
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>

                    {/* Bottom section */}
                    <div className="flex flex-col gap-y-6 relative z-10">
                      {/* Country/Region selector */}
                      <div
                        className="flex justify-between items-center p-3 bg-gray-800/50 border border-green-400/30 hover:border-blue-400/50 transition-colors duration-200"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150 text-green-400",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>

                      {/* System info */}
                      <div className="space-y-2">
                        <div className="bg-gray-800/50 border border-green-400/30 p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full "></div>
                            <span className="text-xs text-green-400 uppercase tracking-wide">System Status</span>
                          </div>
                          <div className="text-xs text-gray-400">
                            <span className="text-blue-400">&gt;</span> Connection: SECURE
                            <br />
                            <span className="text-blue-400">&gt;</span> Build: v2.0.1
                          </div>
                        </div>

                        <Text className="text-xs text-gray-500 text-center">
                          © {new Date().getFullYear()} fdh Systems
                          <br />
                          <span className="text-green-400">All systems operational</span>
                        </Text>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-20 right-10 w-1 h-1 bg-blue-400 rounded-full "></div>
                    <div className="absolute bottom-20 left-10 w-1 h-1 bg-green-400 rounded-full " style={{ animationDelay: '1s' }}></div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu