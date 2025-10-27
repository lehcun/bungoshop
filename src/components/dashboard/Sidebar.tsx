import React from 'react';

const Sidebar = () => {
  return (
    <div className="">
      <section className="border-b-1 border-gray-200 p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <label>Quản trị viên</label>
      </section>
      <section className="h-screen py-4">
        <div className="trasition mx-4 cursor-pointer rounded-xl p-4 duration-200 ease-out hover:translate-x-1.5 hover:bg-blue-100">
          <span>📊</span>
          <span>Tổng Quan</span>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
