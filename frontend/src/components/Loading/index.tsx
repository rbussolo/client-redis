import { LoadingContainer } from "./styles";

import loadingImg from '../../assets/images/loading.svg';

interface LoadingProps {
  showLoading?: boolean;
}

export function Loading({ showLoading = false }: LoadingProps){
  if (!showLoading) {
    return null
  }

  return (
    <LoadingContainer>
      <img src={loadingImg} />
    </LoadingContainer>
  )
}