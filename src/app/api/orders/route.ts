import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { customerData, orderItems, total } = data;

    // Criar o pedido no banco de dados
    const order = await prisma.order.create({
      data: {
        customerName: customerData.nome,
        customerPhone: customerData.telefone,
        address: {
          street: customerData.rua,
          number: customerData.numero,
          neighborhood: customerData.bairro,
          complement: customerData.complemento,
          reference: customerData.pontoReferencia,
        },
        items: {
          create: orderItems.map((item: any) => ({
            size: item.size.size,
            base: item.base.name,
            topping: item.topping.name,
            complements: item.complements.map((c: any) => c.name),
            extras: item.extras.map((e: any) => e.name),
            quantity: item.quantity,
            price: item.size.price + item.extras.reduce((sum: number, extra: any) => sum + extra.price, 0),
          })),
        },
        total,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Pedido realizado com sucesso!',
      orderId: order.id 
    });
  } catch (error) {
    console.error('Erro ao processar pedido:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao processar pedido' },
      { status: 500 }
    );
  }
} 