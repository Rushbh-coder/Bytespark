import { UserPlus, Edit2, Trash2 } from "lucide-react";

const UsersView = ({ users, deleteUser, setShowUserModal }) => {
  return (
    <div className="space-y-8">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Clientele List
          </h1>
          <p className="text-slate-400 text-sm italic">
            Managing your active glow community
          </p>
        </div>

        <button
          onClick={() => setShowUserModal(true)}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl"
        >
          <UserPlus size={18} /> Add Client
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-rose-50 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-rose-50/30">
            <tr>
              <th className="px-8 py-6 text-xs uppercase text-slate-400">
                Client
              </th>
              <th className="px-8 py-6 text-xs uppercase text-slate-400">
                Tier
              </th>
              <th className="px-8 py-6 text-xs uppercase text-slate-400">
                Member Since
              </th>
              <th className="px-8 py-6 text-xs uppercase text-right text-slate-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-rose-50/20">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}`}
                      className="w-12 h-12 rounded-2xl bg-rose-50"
                      alt=""
                    />
                    <div>
                      <p className="font-bold text-slate-800">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-8 py-5">
                  <span className="px-3 py-1 rounded-full text-xs bg-slate-50 text-slate-500 border">
                    {user.role}
                  </span>
                </td>

                <td className="px-8 py-5 text-sm text-slate-500">
                  {user.joined}
                </td>

                <td className="px-8 py-5 text-right">
                  <button className="p-2 hover:text-rose-500">
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="p-2 hover:text-rose-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersView;
