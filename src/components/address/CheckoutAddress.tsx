import { useDefaultAddress } from '@/hook/address/useDefaultAddress';
import React, { useState } from 'react';
import Button from '../ui/Button';
import { useCreateAddress } from '@/hook/address/useCreateAddress';
import AddAddressForm from '../user/AddAddressForm';
import AddressSelectionModel from './AddressSelectionModel';

const CheckoutAddress = () => {
  const { defaultAddress } = useDefaultAddress();
  // const { toggleForm } = useCreateAddress();
  const address = defaultAddress;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenAddressList = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="rounded-2xl bg-white p-4 shadow-lg shadow-black/10">
      <div className="flex items-center">
        <h3 className="flex-1 py-2 text-lg font-semibold">Địa chỉ nhận hàng</h3>
        <button
          onClick={handleOpenAddressList}
          className="cursor-pointer text-blue-600"
        >
          Thay đổi
        </button>
      </div>
      <div className="px-2">
        {address ? (
          <div className="mb-4">
            <div className="space-y-1 text-gray-500">
              <div className="flex gap-x-2">
                <label className="text-black">{address?.recipient}</label>
                {' | '}
                <label>{address?.phone}</label>
              </div>
              <p>
                {address?.line1}/{address?.city}/{address?.country}
              </p>
              <label className="border-shop_dark_blue text-shop_dark_blue border-1 px-2 text-sm">
                Mặc định
              </label>
            </div>
          </div>
        ) : (
          <>
            <Button
              className="w-full rounded-md border-1 border-gray-300"
              variant="ghost"
              // onClick={toggleForm}
            >
              Thêm địa chỉ mới
            </Button>
          </>
        )}
      </div>

      {/* List address */}
      <AddressSelectionModel
        isOpen={isOpen}
        handleOpenAddressList={handleOpenAddressList}
      />
    </div>
  );
};

export default CheckoutAddress;
