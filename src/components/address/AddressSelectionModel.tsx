import { useAddresses } from '@/hook/address/useAddresses';
import { Address } from '@/models/User';
import { X } from 'lucide-react';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import AddAddressForm from '../user/AddAddressForm';
import Button from '../ui/Button';

const AddressSelectionModel = ({
  isOpen,
  handleOpenAddressList,
  selectedAddress,
  setSelectedAddress,
}: {
  isOpen: boolean;
  handleOpenAddressList: () => void;
  selectedAddress: Address | null;
  setSelectedAddress: Dispatch<SetStateAction<Address | null>>;
}) => {
  const { addresses } = useAddresses();

  //View set cho form hien thi
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const isAddr = addresses.length === 0;

  useEffect(() => {
    if (addresses.length === 0) {
      setView('add');
    }
  }, [addresses]);

  //Dia chi dang duoc chinh sua
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleClose = () => {
    setView(isAddr ? 'add' : 'list');
    setEditingAddress(null);
    handleOpenAddressList();
  };

  const handleOpenAddForm = () => {
    setView('add');
  };

  const handleOpenUpdateForm = (address: Address) => {
    setView('edit');
    setEditingAddress(address);
  };

  const handleBackToList = () => {
    setView('list');
    setEditingAddress(null);
  };

  //Xử lý chọn địa chỉ khác và render lại
  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    handleClose();
  };

  // Nếu modal không mở → không render gì
  if (!isOpen) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-70`}
      >
        <div className="w-full max-w-xl rounded-md bg-white">
          <section className="flex border-b-1 border-gray-400 p-4">
            <h2 className="flex-1 text-xl font-semibold">
              {view === 'list' && 'Địa chỉ của tôi'}
              {view === 'add' && 'Thêm địa chỉ mới'}
              {view === 'edit' && 'Chỉnh sửa địa chỉ'}
            </h2>
            <button onClick={handleClose}>
              <X />
            </button>
          </section>

          <div className="max-h-[60vh] overflow-y-auto px-6">
            {view === 'list' ? (
              <>
                {addresses?.map((address: Address) => (
                  <section
                    key={address.id}
                    className="border-b border-gray-400 py-4 last:border-0"
                  >
                    <div className="flex">
                      <input
                        type="radio"
                        checked={address.id === selectedAddress?.id}
                        onChange={() => handleSelectAddress(address)}
                        className="mt-0.5 mr-2 h-4 w-4 rounded-lg border-2 border-gray-200"
                      />
                      <div className="flex-1 space-y-1 text-gray-500">
                        <div className="flex gap-x-2">
                          <label className="text-black">
                            {address?.recipient}
                          </label>
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
                  </section>
                ))}
              </>
            ) : (
              <AddAddressForm
                initData={view === 'edit' ? editingAddress : null}
                onSuccess={handleBackToList}
                onCancel={isAddr ? handleClose : handleBackToList}
              />
            )}
          </div>
          {view === 'list' ? (
            <section className="flex-end border-t-1 border-gray-400 p-4">
              <Button onClick={handleOpenAddForm}>Thêm địa chỉ mới</Button>
            </section>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressSelectionModel;
