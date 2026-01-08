'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';
import { useAddresses } from '@/hook/address/useAddresses';
import { Address } from '@/models/User';
import AddAddressForm from '../user/AddAddressForm';
import { X } from 'lucide-react';

const UserAddressModel = () => {
  const { addresses } = useAddresses();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'add' | 'edit'>('add');
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleOpenForm = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenUpdateForm = (address: Address) => {
    setView('edit');
    setEditingAddress(address);
    handleOpenForm();
  };

  const handleClose = () => {
    handleOpenForm();
    setEditingAddress(null);
  };
  return (
    <div className="bg-white px-8 shadow-sm">
      <section className="flex h-20 items-center justify-between border-b-1 border-gray-300 py-4">
        <h3 className="text-xl font-semibold">Địa chỉ của tôi</h3>
        <Button onClick={handleOpenForm} className="rounded-md">
          Thêm địa chỉ mới
        </Button>
      </section>

      {/* Address User list */}
      {addresses.length > 0 ? (
        <section>
          {addresses?.map((address: Address) => (
            <div
              key={address.id}
              className="border-b border-gray-400 py-4 last:border-0"
            >
              <div className="flex">
                <div className="flex-1 space-y-1 text-gray-500">
                  <div className="flex gap-x-2">
                    <label className="text-black">{address?.recipient}</label>
                    {' | '}
                    <label className="flex-1">{address?.phone}</label>
                    <button
                      onClick={() => handleOpenUpdateForm(address)}
                      className="text-blue-600"
                    >
                      Sửa
                    </button>
                  </div>
                  <p>
                    {address?.line1}/{address?.city}/{address?.country}
                  </p>
                  {address.isDefault ? (
                    <label className="border-shop_dark_blue text-shop_dark_blue border-1 px-2 text-sm">
                      Mặc định
                    </label>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="py-16 text-center">
          <label className="text-xl">Tài khoản hiện có nhập địa chỉ nào</label>
        </section>
      )}

      {isOpen ? (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-70`}
        >
          <div className="w-full max-w-xl rounded-md bg-white">
            <section className="flex border-b-1 border-gray-400 p-4">
              <h2 className="flex-1 text-xl font-semibold">
                {view === 'add' && 'Thêm địa chỉ mới'}
                {view === 'edit' && 'Chỉnh sửa địa chỉ'}
              </h2>
              <button onClick={handleClose}>
                <X />
              </button>
            </section>

            <div className="max-h-[60vh] overflow-y-auto px-6">
              <AddAddressForm
                initData={view === 'edit' ? editingAddress : null}
                onCancel={handleClose}
                onSuccess={handleClose}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserAddressModel;
