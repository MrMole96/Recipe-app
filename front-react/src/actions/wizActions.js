import { stepperConst } from './actionTypes'

export function nextStep() {
    return { type: stepperConst.NEXT_STEP }
}
export function previousStep() {
    return { type: stepperConst.PREVIOUS_STEP }
}