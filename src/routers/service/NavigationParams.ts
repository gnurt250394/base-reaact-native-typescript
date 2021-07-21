import { JobRespone, PartnerReponse } from 'network/apis/jobs/JobResponse';
import { ImageSourcePropType } from 'react-native';
import {
  Geometry
} from 'react-native-google-places-autocomplete';
import { OptionAddressProps } from 'screens/partner/Location/SelectLocationScreen';
export type AddressTypeParams = 'province' | 'district' | 'village';
export type TypeScreenParam = 'login' | 'register'
export interface LoginParams {
  typeScreen: TypeScreenParam;
  isBack?: boolean;
}
export interface ForgotPasswordParams {
  isBack?: boolean;
  phone?: string
}

export type UpdateFieldParams = {
  data?: any[]
  screen?: string
}
export type GooglePlacesInputParams = {
  onPlaceChosen: (id: string, formatAddress?: string, geometry?: Geometry) => void
  id: string
}
export type DetailJobParams = {
  id: string
  type?: 'submitted'
}
export type EditProfileParams = {
  onUpdate?: () => void
}
export type DetailPartnerParams = {
  partner?: PartnerReponse | undefined
}
export type DetailRequestInterviewParams = {
  id: string
  type?: 'submitted' | undefined
}
export type MapDirectionParams = {
  address: string
  type?: 'submitted' | undefined
}
export type SelectLocationParams = {
  callback: (dataCallback: OptionAddressProps) => void
  type: AddressTypeParams
  id?: string
}
export type DetailCvParams = {
  id: string
}
export type CreateJobParams = {
  data: JobRespone
}