import SubPageTemplate from '../components/SubPageTemplate';
import { SERVICES } from '../data/services';

export default function RealEstateLiquidity() {
  return (
    <SubPageTemplate
      pageId="real-estate-liquidity"
      heroKey="liquidity"
      serviceData={SERVICES['real-estate-liquidity']}
    />
  );
}
