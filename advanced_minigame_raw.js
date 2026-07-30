            let type = Math.floor(Math.random() * 4); // 0=Normal, 1=Power, 2=Curve, 3=ZigZag
            
            let targetX = 10 + Math.random() * 80;
            let targetY = 10 + Math.random() * 80;
            
            let flightTime = 1100;
            let requiredPose = 'AGARRE';
            
            if (type === 0) {
                // Tiro Normal
                ball.style.boxShadow = '0 0 20px 8px rgba(255,255,255,0.8)';
                requiredPose = 'AGARRE';
                flightTime = 1100;
            } else if (type === 1) {
                // Tiro Potente (Puños)
                ball.style.boxShadow = '0 0 25px 12px rgba(255,0,0,0.9)';
                requiredPose = 'PUNO';
                flightTime = 550;
            } else if (type === 2) {
                // Tiro con Efecto (Estirada)
                ball.style.boxShadow = '0 0 25px 12px rgba(180,0,255,0.9)';
                requiredPose = 'ESTIRADA';
                flightTime = 1300;
                targetX = Math.random() > 0.5 ? 10 + Math.random()*15 : 75 + Math.random()*15;
            } else if (type === 3) {
                // Tiro Zig-Zag (Estirada)
                ball.style.boxShadow = '0 0 25px 12px rgba(255,255,0,0.9)';
                requiredPose = 'ESTIRADA';
                flightTime = 1300;
            }
            
            setTimeout(() => {
                if (type === 2) { // Efecto
                    const midX = (targetX > 50) ? 10 : 90;
                    ball.style.transition = `all ${flightTime*0.5}ms cubic-bezier(0.1, 0.7, 0.4, 1)`;
                    ball.style.top = '10%';
                    ball.style.left = `${midX}%`;
                    ball.style.width = '70px'; ball.style.height = '70px';
                    
                    setTimeout(() => {
                        ball.style.transition = `all ${flightTime*0.5}ms cubic-bezier(0.5, 0, 0.9, 0.2)`;
                        ball.style.top = `${targetY}%`;
                        ball.style.left = `${targetX}%`;
                        ball.style.width = '160px'; ball.style.height = '160px';
                    }, flightTime*0.5);
                } else if (type === 3) { // Zig-Zag
                    const fakeX = (targetX > 50) ? 20 : 80;
                    const fakeY = (targetY > 50) ? 20 : 80;
                    ball.style.transition = `all ${flightTime*0.4}ms linear`;
                    ball.style.top = `${fakeY}%`;
                    ball.style.left = `${fakeX}%`;
                    ball.style.width = '80px'; ball.style.height = '80px';
                    
                    setTimeout(() => {
                        ball.style.transition = `all ${flightTime*0.6}ms cubic-bezier(0, 0, 0.2, 1)`;
                        ball.style.top = `${targetY}%`;
                        ball.style.left = `${targetX}%`;
                        ball.style.width = '160px'; ball.style.height = '160px';
                    }, flightTime*0.4);
                } else { // Normal/Potente
                    ball.style.transition = `all ${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1)`;
                    ball.style.top = `${targetY}%`;
                    ball.style.left = `${targetX}%`;
                    ball.style.width = '160px'; ball.style.height = '160px';
                }
            }, 50);