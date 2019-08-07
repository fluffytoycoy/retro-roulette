import  {useEffect} from 'react';
import { withRouter } from 'react-router-dom';


const ScrollToTop = ({ children, location: { pathname }}) => {

  function shouldScroll(){
    const serviceRegex = '(/Services/)([A-Z])+';
    return !pathname.match(serviceRegex);
  }

  useEffect(() => {
    if(shouldScroll()){
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return children || null;


};

export default withRouter(ScrollToTop);
