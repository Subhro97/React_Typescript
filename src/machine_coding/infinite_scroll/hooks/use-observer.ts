const useObserver = (
  oberverCallback: () => void,
  observeElm: HTMLElement,
  parentElm?: HTMLElement | null
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;

      observer.unobserve(observeElm);

      oberverCallback();
    },
    {
      root: parentElm,
      threshold: 0.4,
    }
  );

  observer.observe(observeElm);
};

export default useObserver;
