import { Link } from 'react-router-dom'

const cards = [
  {
    title: 'Sorting Algorithms',
    description: 'Bubble, Selection, Insertion, Merge & Quick Sort with step-by-step animation',
    link: '/sorting',
    accent: 'border-blue-500',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    icon: '⬆',
    badge: '5 algorithms',
  },
  {
    title: 'Stack',
    description: 'Push and pop with LIFO visualization and overflow detection',
    link: '/stack',
    accent: 'border-purple-500',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
    icon: '▤',
    badge: 'LIFO',
  },
  {
    title: 'Queue',
    description: 'Enqueue and dequeue with front and rear pointer animation',
    link: '/queue',
    accent: 'border-green-500',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-400',
    icon: '⇒',
    badge: 'FIFO',
  },
  {
    title: 'Linked List',
    description: 'Insert and delete nodes with animated pointer arrows between boxes',
    link: '/linked-list',
    accent: 'border-orange-500',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-400',
    icon: '⬡',
    badge: 'Singly linked',
  },
  {
    title: 'Binary Tree',
    description: 'Insert nodes and animate inorder, preorder, postorder traversal paths',
    link: '/tree',
    accent: 'border-red-500',
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-400',
    icon: '⬡',
    badge: 'BST',
  },
]

function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <div className="inline-block bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium px-3 py-1 rounded-full mb-4">
            Interactive Learning
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            DSA <span className="text-blue-400">Visualizer</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Learn Data Structures and Algorithms through interactive animations.
            Watch every comparison, swap, and traversal happen in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className={`group bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-opacity-60 hover:scale-[1.02] transition-all duration-200 ${card.accent} hover:border-opacity-100`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${card.iconBg} w-10 h-10 rounded-xl flex items-center justify-center ${card.iconColor} text-lg`}>
                  {card.icon}
                </div>
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-md">
                  {card.badge}
                </span>
              </div>

              <h2 className={`text-base font-semibold mb-2 transition-colors group-hover:${card.iconColor}`}>
                {card.title}
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed">
                {card.description}
              </p>

              <div className={`mt-4 text-xs font-medium ${card.iconColor} flex items-center gap-1`}>
                Explore →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 text-center border-t border-gray-800 pt-10">
          <div>
            <div className="text-3xl font-bold text-white mb-1">5</div>
            <div className="text-sm text-gray-500">Sorting algorithms</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">4</div>
            <div className="text-sm text-gray-500">Data structures</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">∞</div>
            <div className="text-sm text-gray-500">Things to learn</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home