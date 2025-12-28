import React, { ChangeEvent, FormEvent } from 'react';
import { AddressFormData } from '../product/CartSummary';
import Button from '../common/Button';

interface Props {
  formData: AddressFormData;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleForm: () => void;
}

const AddAddressForm = ({
  formData,
  handleSubmit,
  handleChange,
  toggleForm,
}: Props) => {
  return (
    <>
      <div className="w-full max-w-xl rounded-2xl bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Địa chỉ mới</h2>
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <input
            name="recipient"
            placeholder="Họ tên"
            value={formData.recipient}
            onChange={handleChange}
            className="rounded-lg border-1 border-gray-200 p-2"
          />

          <input
            name="city"
            placeholder="Tỉnh/Thành phố"
            value={formData.city}
            onChange={handleChange}
            className="rounded-lg border-1 border-gray-200 p-2"
          />

          <input
            name="line1"
            placeholder="Địa chỉ cụ thể"
            value={formData.line1}
            onChange={handleChange}
            className="rounded-lg border-1 border-gray-200 p-2"
          />

          <input
            name="phone"
            placeholder="SĐT Người nhận"
            value={formData.phone}
            onChange={handleChange}
            className="rounded-lg border-1 border-gray-200 p-2"
          />

          <input
            name="label"
            placeholder="Loại địa chỉ, VD: Nhà riêng, Văn phòng"
            value={formData.label}
            onChange={handleChange}
            className="rounded-lg border-1 border-gray-200 p-2"
          />
          <div className="flex gap-x-2">
            <Button
              className="w-full rounded-xl border-1 border-blue-500 text-blue-500 hover:bg-gray-100"
              variant="outline"
              onClick={toggleForm}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="w-full rounded-xl bg-blue-500 hover:bg-blue-600"
            >
              Thêm địa chỉ
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAddressForm;
