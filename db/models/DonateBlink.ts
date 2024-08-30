import mongoose from 'mongoose'

export interface IAction {
  label: string
  href: string
  parameters?: {
    name: string
    label: string
    required: boolean
  }[]
}

export interface IDonateBlink extends mongoose.Document {
  blinkId: number
  title: string
  description: string
  icon: string
  label: string
  toPubKey: string
  actions: IAction[]
}

const DonateBlinkSchema = new mongoose.Schema({
  blinkId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  toPubKey: {
    type: String,
    required: true
  },
  actions: {
    type: Array,
    required: true
  }
})

const DonateBlink =
  mongoose.models.DonateBlink ||
  mongoose.model<IDonateBlink>('DonateBlink', DonateBlinkSchema)

export default DonateBlink
