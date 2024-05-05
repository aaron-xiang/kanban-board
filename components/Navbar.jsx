import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
      <div className="text-white font-bold" href={'/'}>
        Kanban Board
      </div>
      <Link className="text-black bg-white p-2" href={'/addTask'}>
        Add Task
      </Link>
    </nav>
  );
}