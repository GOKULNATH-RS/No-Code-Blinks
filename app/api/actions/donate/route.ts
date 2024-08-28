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

/**
 * INFO: data from client side
 *
 * title,
 * description,
 * icon,
 * amount,
 * label,
 * actions[]
 * toPubKey
 */

const headers = createActionHeaders()

export const GET = (req: Request) => {
  try {
    const reqUrl = new URL(req.url)

    const id = reqUrl.searchParams.get('id')

    const payloadData = getData(Number(id))
    const { title, description, icon, actions, label } = payloadData

    const payload: ActionGetResponse = {
      type: 'action',
      title: title || '',
      icon: icon || '',
      description: description || '',
      label: label || 'Donate',
      links: {
        actions: actions || []
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

    const connection = new Connection(clusterApiUrl('devnet'))

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

function getData(id: number) {
  const payloadsfromDB = [
    {
      id: 8192,
      title: 'title',
      description: 'desc',
      label: 'Donate SOL',
      icon: 'https://i.seadn.io/gae/ulTNkL1s8SxAEkwH4pxkHxMYh2r5HJeBRcURychonbbelmY7Yg1mFkJUS_toAPVTTBGqDtuc1dq5ZwsJv9fUQ0h12f5M919x10wmaUU?auto=format&dpr=1&w=1000',
      toPubKey: '2PC9WaqoSReSRLEYFGTBDCSuknZ7UkZaga1xE76MujtW',
      actions: [
        {
          label: 'Donate 5 SOL',
          href: 'http://localhost:3000/api/actions/donate?id=2&to=2PC9WaqoSReSRLEYFGTBDCSuknZ7UkZaga1xE76MujtW&amount=5'
        }
      ]
    },
    {
      id: 2,
      title: 'Donate Me',
      description: 'Donation for me',
      label: 'Donate SOL',
      icon: 'https://i.seadn.io/gae/ulTNkL1s8SxAEkwH4pxkHxMYh2r5HJeBRcURychonbbelmY7Yg1mFkJUS_toAPVTTBGqDtuc1dq5ZwsJv9fUQ0h12f5M919x10wmaUU?auto=format&dpr=1&w=1000',
      toPubKey: '2PC9WaqoSReSRLEYFGTBDCSuknZ7UkZaga1xE76MujtW',
      actions: [
        {
          label: 'Donate 0.2 SOL',
          href: 'http://localhost:3000/api/actions/donate?id=2&to=2PC9WaqoSReSRLEYFGTBDCSuknZ7UkZaga1xE76MujtW&amount=0.2'
        },
        {
          label: 'Donate 0.5 SOL',
          href: 'http://localhost:3000/api/actions/donate?id=2&to=2PC9WaqoSReSRLEYFGTBDCSuknZ7UkZaga1xE76MujtW&amount=0.5'
        },
        {
          label: 'Donate SOL',
          href: 'http://localhost:3000/api/actions/donate?id=2&to=2PC9WaqoSReSRLEYFGTBDCSuknZ7UkZaga1xE76MujtW&amount={amount}',
          parameters: [
            {
              name: 'amount',
              label: 'Enter the SOL',
              required: true
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'Life Donate',
      description: 'Donation for life',
      label: 'Donate SOL',
      icon: 'https://i.seadn.io/gae/ulTNkL1s8SxAEkwH4pxkHxMYh2r5HJeBRcURychonbbelmY7Yg1mFkJUS_toAPVTTBGqDtuc1dq5ZwsJv9fUQ0h12f5M919x10wmaUU?auto=format&dpr=1&w=1000',
      toPubKey: '8sd6ThQ9fG8ypeNLhL6wzxNiPwdJ7ptyguzXiTmsHPAV',
      actions: [
        {
          label: 'Donate 0.002 SOL',
          href: 'http://localhost:3000/api/actions/donate?id=2&to=2PC9WaqoSReSRLEYFGTBDCSuknZ7UkZaga1xE76MujtW&amount=0.002'
        },
        {
          label: 'Donate 0.005 SOL',
          href: 'http://localhost:3000/api/actions/donate?id=2&to=2PC9WaqoSReSRLEYFGTBDCSuknZ7UkZaga1xE76MujtW&amount=0.005'
        }
      ]
    }
  ]

  const data = payloadsfromDB.find((payload) => payload.id === id)

  return {
    title: data?.title,
    description: data?.description,
    label: data?.label,
    icon: data?.icon,
    toPubKey: new PublicKey(data?.toPubKey || '').toBase58(),
    actions: data?.actions
  }
}
