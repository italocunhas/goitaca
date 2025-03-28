import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { items, customerData } = data;

    // Primeiro criar o endereço
    const address = await prisma.address.create({
      data: {
        street: customerData.rua,
        number: customerData.numero,
        neighborhood: customerData.bairro,
        complement: customerData.complemento,
        city: customerData.cidade,
        state: customerData.estado,
        zipCode: customerData.cep,
        userId: customerData.userId
      }
    });

    // Depois criar o pedido com o endereço
    const order = await prisma.order.create({
      data: {
        customerName: customerData.nome,
        customerPhone: customerData.telefone,
        addressId: address.id,
        items: {
          create: items.map((item: any) => ({
            size: item.size,
            base: item.base,
            topping: item.topping,
            complements: item.complements,
            extras: item.extras,
            quantity: item.quantity,
            price: item.price,
            notes: item.notes
          }))
        },
        total: items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0),
        subtotal: items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0),
        tax: 0,
        deliveryFee: 0
      }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  }
} 