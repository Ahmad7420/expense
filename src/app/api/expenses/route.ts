import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/db';

export async function GET() {
    try {
        const db = await connectToDatabase();
        const expenses = await db.collection('user_records').find().toArray();

        return NextResponse.json(expenses);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch expenses', details: error instanceof Error ? error.message : error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const db = await connectToDatabase();
        const body = await request.json();

        // Basic validation (customize as needed)
        if (!body || !body.amount || !body.description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const result = await db.collection('user_records').insertOne(body);

        // Fetch the inserted document using the insertedId
        const insertedExpense = await db.collection('user_records').findOne({ _id: result.insertedId });

        return NextResponse.json({ message: 'Expense added', data: insertedExpense }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add expense', details: error instanceof Error ? error.message : error }, { status: 500 });
    }
}