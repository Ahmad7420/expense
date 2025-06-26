import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/db';
import { ObjectId } from 'mongodb';

export async function PUT(req: NextRequest, context: any) {
    try {
        const db = await connectToDatabase();
        const body = await req.json();

        const { id } = await context.params;
        // Remove _id if it exists in the body
        if ('_id' in body) {
            delete body._id;
        }

        await db.collection('user_records').updateOne(
            { _id: new ObjectId(id) },
            { $set: body }
        );

        return NextResponse.json({ ...body, _id: id });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update record', details: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function DELETE(_req: NextRequest, context: any) {
    try {
        const { id } = await context.params;

        const db = await connectToDatabase();
        await db.collection('user_records').deleteOne({ _id: new ObjectId(id) });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete record', details: (error as Error).message }, { status: 500 });
    }
}