const runningNumbers = document.querySelectorAll('[data-time][data-step][data-num]');
runningNumbers.forEach((el) => {
  const time = el.dataset.time;
  const step = el.dataset.step;
  const num = el.dataset.num;

  let originalNum = parseInt(el.innerText);
  let oneStepTime = Math.round(time/(num/step));

  const interval = setInterval(() => {
    originalNum += parseInt(step);
    if(originalNum >= num) {
      clearInterval(interval);
      if(originalNum !== num) originalNum = num;
    };
    el.innerText = originalNum;
  }, oneStepTime);
});