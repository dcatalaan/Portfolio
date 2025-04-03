import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    dx: number;
    dy: number;
    size: number;
}

const ParticlesBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>();
    const mouseRef = useRef<{ x: number; y: number; radius: number }>({ x: 0, y: 0, radius: 100 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const resizeCanvas = () => {
            const scale = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * scale;
            canvas.height = window.innerHeight * scale;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            ctx.scale(scale, scale);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const scale = window.devicePixelRatio || 1;
            mouseRef.current.x = (e.clientX - rect.left) * scale;
            mouseRef.current.y = (e.clientY - rect.top) * scale;
        };

        // Mouse leave handler
        const handleMouseLeave = () => {
            mouseRef.current.x = 0;
            mouseRef.current.y = 0;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        // Create particles
        const particleCount = 50;
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            size: Math.random() * 2 + 2 // Random size between 2 and 4
        }));

        let lastTime = 0;
        const fps = 60;
        const interval = 1000 / fps;

        const animate = (currentTime: number) => {
            if (!ctx || !canvas) return;

            animationFrameRef.current = requestAnimationFrame(animate);

            const deltaTime = currentTime - lastTime;
            if (deltaTime < interval) return;

            lastTime = currentTime - (deltaTime % interval);

            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            const particles = particlesRef.current;
            const len = particles.length;

            // Update and draw particles
            for (let i = 0; i < len; i++) {
                const particle = particles[i];

                // Update position with current velocity
                particle.x += particle.dx;
                particle.y += particle.dy;

                // Mouse interaction
                const mouse = mouseRef.current;
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    // Push particles away from mouse
                    const force = (mouse.radius - distance) / mouse.radius;
                    particle.dx = particle.dx * 0.9 - (dx / distance) * force * 15;
                    particle.dy = particle.dy * 0.9 - (dy / distance) * force * 15;
                }

                // Add some friction
                particle.dx *= 0.99;
                particle.dy *= 0.99;

                // Add some random movement
                particle.dx += (Math.random() - 0.5) * 0.2;
                particle.dy += (Math.random() - 0.5) * 0.2;

                // Bounce off walls
                if (particle.x < 0) {
                    particle.x = 0;
                    particle.dx *= -1;
                } else if (particle.x > window.innerWidth) {
                    particle.x = window.innerWidth;
                    particle.dx *= -1;
                }

                if (particle.y < 0) {
                    particle.y = 0;
                    particle.dy *= -1;
                } else if (particle.y > window.innerHeight) {
                    particle.y = window.innerHeight;
                    particle.dy *= -1;
                }

                // Limit maximum speed
                const speed = Math.sqrt(particle.dx * particle.dx + particle.dy * particle.dy);
                if (speed > 15) {
                    particle.dx = (particle.dx / speed) * 15;
                    particle.dy = (particle.dy / speed) * 15;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(107, 114, 128, 0.7)';
                ctx.fill();

                // Draw connections (optimized)
                for (let j = i + 1; j < len; j++) {
                    const other = particles[j];
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = dx * dx + dy * dy; // Avoid square root for performance

                    if (distance < 10000) { // Square of 100
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(107, 114, 128, ${0.15 * (1 - distance / 5000)})`;
                        ctx.stroke();
                    }
                }
            }
        };

        animate(0);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0"
            style={{
                pointerEvents: 'none',
                zIndex: -1,
                backgroundColor: 'transparent'
            }}
        />
    );
};

export default ParticlesBackground;
