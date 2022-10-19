import {
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  useEffect,
  useRef,
} from "react";
import FormCheck, { FormCheckProps } from "react-bootstrap/FormCheck";

interface CheckboxProps extends FormCheckProps {
  indeterminate?: boolean;
}

function Checkbox(props: CheckboxProps, ref: ForwardedRef<HTMLInputElement>) {
  const { indeterminate = false, ...p } = props;

  const defaultRef = useRef<HTMLInputElement>();
  const resolvedRef = (ref as MutableRefObject<HTMLInputElement>) || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [indeterminate, resolvedRef]);

  return <FormCheck ref={resolvedRef} {...p} />;
}

export default forwardRef(Checkbox);
