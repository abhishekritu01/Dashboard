'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  Bars3Icon,
  BellIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useState } from 'react'

interface NavigiationItem {
  name: string
  href: string
  icon: any
  current: boolean
}

const navigation: NavigiationItem[] = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  
]

const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

interface LayoutProps {
  children: React.ReactNode;  // Correctly typing the 'children' prop
}

const Layout = ({ children }: LayoutProps) => {  // Passing 'children' as a prop
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false); // Added state for dropdown visibility

  const logout = () => {
    // Your logout logic here
  }

  return (
    <>
      {/* Dialog for sidebar in mobile */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar content */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={clsx(
                              item.current
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                              'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                            )}
                          >
                            <item.icon aria-hidden="true" className="size-6 shrink-0" />
                            {item.name}
                          </a>
                          {item.current && dropdownOpen && (
                            <div className="absolute left-0 mt-2 w-full bg-gray-800 rounded-md shadow-lg">
                              <Menu as="div">
                                <MenuButton className="block text-white p-2">Dropdown</MenuButton>
                                <MenuItems className="py-1">
                                  <MenuItem>
                                    <a href="#" className="block p-2 text-gray-100 hover:bg-gray-700">Option 1</a>
                                  </MenuItem>
                                  <MenuItem>
                                    <a href="#" className="block p-2 text-gray-100 hover:bg-gray-700">Option 2</a>
                                  </MenuItem>
                                </MenuItems>
                              </Menu>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8 w-auto"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={clsx(
                          item.current
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                        )}
                      >
                        <item.icon aria-hidden="true" className="size-6 shrink-0" />
                        {item.name}
                      </a>
                      {item.current && dropdownOpen && (
                        <div className="absolute left-0 mt-2 w-full bg-gray-800 rounded-md shadow-lg">
                          <Menu as="div">
                            <MenuButton className="block text-white p-2">Dropdown</MenuButton>
                            <MenuItems className="py-1">
                              <MenuItem>
                                <a href="#" className="block p-2 text-gray-100 hover:bg-gray-700">Option 1</a>
                              </MenuItem>
                              <MenuItem>
                                <a href="#" className="block p-2 text-gray-100 hover:bg-gray-700">Option 2</a>
                              </MenuItem>
                            </MenuItems>
                          </Menu>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 lg:hidden">
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6 text-gray-500" />
          </button>

          <div className="flex flex-1 items-center justify-center gap-x-4 sm:max-w-xs sm:flex-1 sm:justify-center lg:max-w-none">
            {/* Search section (optional) */}
          </div>

          <div className="flex gap-x-4 lg:gap-x-6">
            <button type="button" className="-m-2.5 p-2.5">
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6 text-gray-500" />
            </button>

            <Menu as="div" className="relative flex items-center">
              <MenuButton className="-m-2.5 flex items-center gap-x-2 p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open user menu</span>
                <img
                  src="https://images.unsplash.com/photo-1501594907359-38c5a05ffea0?crop=faces&fit=crop&h=32&w=32"
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
                <ChevronDownIcon aria-hidden="true" className="size-5 text-gray-500" />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-32 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    <a href={item.href} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">
                      {item.name}
                    </a>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>

        <main className="relative z-0 flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </>
  )
} 
export default Layout
