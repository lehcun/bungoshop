import React from 'react';
import { motion } from 'framer-motion';
import Button from './common/Button';
import Image from 'next/image';

const LonelyCart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
      className="flex w-150 flex-col items-center space-y-4 overflow-hidden rounded-2xl bg-white p-8 text-center shadow-md shadow-black/10"
    >
      <motion.div
        animate={{
          rotate: [0, -10, 10, -10, 10, 0], // lắc qua lắc lại
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatDelay: 1, // chờ 1s rồi mới lắc lại
          ease: 'easeInOut',
        }}
        className="relative h-48 w-48 overflow-hidden rounded-2xl"
      >
        {/* Chiều cao cố định, điều chỉnh theo logo */}
        <Image
          src={
            'https://res.cloudinary.com/dbvlsf9bi/image/upload/v1762501846/11329060_mxzokq.png'
          }
          alt={`Product varient img`}
          fill
          loading="lazy"
          quality={75}
          className="object-contain"
          sizes="100%"
        />
      </motion.div>
      <h1 className="text-4xl font-semibold">Giỏ hàng của bạn đang trống</h1>
      <span className="text-gray-500">
        Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy thử khám phá thử
        những mặt hàng mới trong cửa hàng
      </span>
      <Button
        href="/shop"
        className="w-full rounded-2xl border-1 border-gray-300"
        variant="ghost"
      >
        Chuyển hướng tới của hàng
      </Button>
    </motion.div>
  );
};

export default LonelyCart;
