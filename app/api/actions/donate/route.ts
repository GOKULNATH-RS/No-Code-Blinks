import dbConnect from '@/db/dbConnect'

import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createActionHeaders,
  createPostResponse
} from '@solana/actions'

import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction
} from '@solana/web3.js'
import DonateBlink from '@/db/models/DonateBlink'

const headers = createActionHeaders()

export const GET = async (req: Request) => {
  try {
    const reqUrl = new URL(req.url)

    const id: any = reqUrl.searchParams.get('id')

    const payloadData: any = await getData(id)

    const payload: ActionGetResponse = {
      type: 'action',
      title: payloadData.title || '',
      icon: payloadData.icon || '',
      description: payloadData.description || '',
      label: payloadData.label || 'Donate',
      links: {
        actions: payloadData.actions || []
      }
    }

    return Response.json(payload, { headers })
  } catch (error) {
    console.log(error)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}

export const OPTIONS = GET

export const POST = async (req: Request) => {
  try {
    const reqUrl = new URL(req.url)
    const amount: any = reqUrl.searchParams.get('amount') || 0
    const toPubKey: any = reqUrl.searchParams.get('to') || ''

    const body: ActionPostRequest = await req.json()

    let account: PublicKey

    try {
      account = new PublicKey(body.account)
    } catch (error) {
      return Response.json({ error: 'Invalid account' }, { headers })
    }

    const connection = new Connection(
      process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl('devnet'),
      'confirmed'
    )

    const minimumBalance = await connection.getMinimumBalanceForRentExemption(0)

    if (amount * LAMPORTS_PER_SOL < minimumBalance) {
      return Response.json({ error: 'Amount too small' }, { headers })
    }

    const transferSolInstruction = SystemProgram.transfer({
      fromPubkey: account,
      toPubkey: toPubKey,
      lamports: amount * LAMPORTS_PER_SOL
    })

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash()
    const transaction = new Transaction({
      feePayer: account,
      blockhash,
      lastValidBlockHeight
    }).add(transferSolInstruction)

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: 'Donation successful'
      }
    })

    return Response.json(payload, { headers })
  } catch (error) {
    console.log(error)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}

async function getData(id: string) {
  await dbConnect()

  const payloadsfromDB = await DonateBlink.find({ blinkId: id })

  return payloadsfromDB[0]
}
