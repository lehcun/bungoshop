import { useDefaultAddress } from '@/hook/address/useDefaultAddress';
import React from 'react';
import Button from '../ui/Button';
import { useCreateAddress } from '@/hook/address/useCreateAddress';
import AddAddressForm from '../user/AddAddressForm';

const CheckoutAddress = () => {
  const { defaultAddress } = useDefaultAddress();
  const { formData, isOpenForm, toggleForm, handleChange, handleSubmit } =
    useCreateAddress();
  const address = defaultAddress;
  return (
    <div className="rounded-2xl bg-white p-4 shadow-lg shadow-black/10">
      <h3 className="py-2 text-lg font-semibold">Địa chỉ nhận hàng</h3>
      <div className="px-2">
        {address ? (
          <div className="mb-4">
            <div className="flex border-b-1 border-gray-300 py-2">
              <div className="space-y-1 text-gray-500">
                <div>
                  <label className="text-black">{address?.recipient}</label>
                  {' | '}
                  <label>{address?.phone}</label>
                </div>
                <p>
                  {address?.line1}/{address?.city}/{address?.country}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Button
              className="w-full rounded-md border-1 border-gray-300"
              variant="ghost"
              onClick={toggleForm}
            >
              Thêm địa chỉ mới
            </Button>
          </>
        )}
      </div>

      {/* add address form */}
      <div
        className={`${isOpenForm ? 'flex' : 'hidden'} fixed inset-0 z-10 items-center justify-center backdrop-blur-xl`}
      >
        <AddAddressForm
          formData={formData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          toggleForm={toggleForm}
        />
      </div>
    </div>
  );
};

export default CheckoutAddress;
