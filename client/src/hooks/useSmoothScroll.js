// hooks/useSmoothScroll.js
export const useSmoothScroll = (scrollContainerRef) => {
  return (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };
};
