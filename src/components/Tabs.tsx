import clsx from 'clsx'
import { motion, AnimateSharedLayout } from 'framer-motion'

type ItemProps = {
  tab: any
  isSelected: boolean
  onClick: () => void
  itemClassName?: {
    container?: string
    isSelected?: string
    notSelected?: string
  }
}
const Item = ({ tab, isSelected, onClick, itemClassName }: ItemProps) => {
  return (
    <li className="relative">
      {isSelected && (
        <motion.div
          layoutId="highlight"
          className={clsx('absolute inset-0', itemClassName?.container)}
        />
      )}
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          `block w-full relative z-10 px-5 py-1 leading-6 sm:text-xl font-semibold focus:outline-none transition-colors duration-300  rounded-lg ${
            isSelected
              ? itemClassName?.isSelected ?? 'text-white'
              : itemClassName?.notSelected ?? 'text-yellow-300'
          }`
          // { 'text-white': isSelected, 'text-blue-600': !isSelected }
        )}
      >
        {tab}
      </button>
    </li>
  )
}

type TabProps = {
  tabs: any | any[]
  selected: any
  onChange: (tab?: any) => void
  className?: string
  itemClassName?: {
    container?: string
    isSelected?: string
    notSelected?: string
  }
}

export default function Tabs({
  tabs,
  selected = Array.isArray(tabs) ? tabs[0] : Object.keys(tabs)[0],
  onChange = () => {},
  className = '',
  itemClassName
}: TabProps) {
  return (
    <AnimateSharedLayout>
      <ul
        className={clsx('whitespace-nowrap grid rounded-lg', className, {})}
        style={{
          gridTemplateColumns: `repeat(${
            Array.isArray(tabs) ? tabs.length : Object.keys(tabs).length
          }, minmax(0, 1fr))`
        }}
      >
        {(Array.isArray(tabs) ? tabs : Object.keys(tabs)).map(tab => (
          <Item
            key={tab}
            tab={Array.isArray(tabs) ? tab : tabs[tab]}
            isSelected={selected === tab}
            onClick={() => onChange(tab)}
            itemClassName={itemClassName}
          />
        ))}
      </ul>
    </AnimateSharedLayout>
  )
}
