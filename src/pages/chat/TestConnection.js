import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const TestConnection = () => {
    const [status, setStatus] = useState('No probado');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';
    const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:8081/ws';
    const testGateway = async () => {
        setLoading(true);
        try {
            setStatus('🔄 Probando Gateway.. .');
            const res = await fetch(`${API_URL}/health`);
            const data = await res.json();
            setResponse(data);
            setStatus('✅ Gateway conectado! ');
        }
        catch (error) {
            setStatus('❌ Error de conexión al Gateway');
            setResponse({ error: error.message });
        }
        finally {
            setLoading(false);
        }
    };
    const testChatEndpoint = async () => {
        setLoading(true);
        try {
            setStatus('🔄 Probando endpoint de Chat...');
            const testUserId = 'd66d2d30-56cb-410b-a5f0-9191c38f380e';
            const res = await fetch(`${API_URL}/api/chat/eciexpress/chatuser/${testUserId}/contacts`);
            if (res.ok) {
                const data = await res.json();
                setResponse(data);
                setStatus('✅ Endpoint de Chat funciona!');
            }
            else {
                const error = await res.text();
                setResponse({ error, status: res.status });
                setStatus(`⚠️ Respuesta: ${res.status}`);
            }
        }
        catch (error) {
            setStatus('❌ Error al conectar con Chat');
            setResponse({ error: error.message });
        }
        finally {
            setLoading(false);
        }
    };
    // ⭐ Este test usa WebSocket nativo (fallará con SockJS)
    const testWebSocketNative = () => {
        const wsUrl = 'ws://localhost:8081/ws';
        setStatus('🔄 Probando WebSocket nativo...');
        try {
            const ws = new WebSocket(wsUrl);
            ws.onopen = () => {
                setStatus('✅ WebSocket nativo conectado!');
                setResponse({ websocket: 'Conexión exitosa (nativo)', url: wsUrl });
                ws.close();
            };
            ws.onerror = () => {
                setStatus('❌ WebSocket nativo falló (normal con SockJS)');
                setResponse({
                    error: 'WebSocket nativo no funciona',
                    reason: 'El servidor usa SockJS, no WebSocket puro',
                    solution: 'Usa el botón "Test SockJS/STOMP"'
                });
            };
            ws.onclose = () => {
                console.log('WebSocket cerrado');
            };
        }
        catch (error) {
            setStatus('❌ Error al iniciar WebSocket');
            setResponse({ error: error.message });
        }
    };
    // ⭐ NUEVO:  Test con script externo (evita problemas de import)
    const testWebSocketWithScript = () => {
        setStatus('🔄 Probando con SockJS/STOMP...');
        setResponse({ log: ['Cargando librerías...'] });
        // Cargar SockJS y STOMP desde CDN
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Failed to load ${src}`));
                document.head.appendChild(script);
            });
        };
        Promise.all([
            loadScript('https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js'),
            loadScript('https://cdn.jsdelivr.net/npm/@stomp/stompjs@7/bundles/stomp.umd.min.js')
        ])
            .then(() => {
            setResponse({ log: ['✅ Librerías cargadas', 'Conectando... '] });
            // @ts-ignore
            const client = new StompJs.Client({
                webSocketFactory: () => {
                    // @ts-ignore
                    return new SockJS(WS_URL);
                },
                connectHeaders: {
                    userId: 'd66d2d30-56cb-410b-a5f0-9191c38f380e'
                },
                debug: (str) => {
                    console.log('[STOMP]', str);
                },
                onConnect: () => {
                    setStatus('✅ SockJS/STOMP conectado!');
                    setResponse({
                        success: true,
                        message: 'Conexión exitosa con SockJS y STOMP',
                        url: WS_URL
                    });
                    client.deactivate();
                },
                onStompError: (frame) => {
                    setStatus('❌ Error STOMP');
                    setResponse({
                        error: 'Error STOMP',
                        details: frame.headers['message']
                    });
                },
                onWebSocketError: () => {
                    setStatus('❌ Error WebSocket');
                    setResponse({
                        error: 'No se pudo conectar',
                        tip: 'Verifica que el Gateway y Chat Service estén corriendo'
                    });
                }
            });
            client.activate();
        })
            .catch((error) => {
            setStatus('❌ Error cargando librerías');
            setResponse({ error: error.message });
        });
    };
    return (_jsxs("div", { className: "p-4 md:p-8 max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-2xl md:text-3xl font-bold mb-6", children: "\uD83E\uDDEA Prueba de Conexi\u00F3n - API Gateway" }), _jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 mb-6", children: [_jsxs("div", { className: "mb-4", children: [_jsxs("p", { className: "text-sm text-gray-600 mb-2", children: [_jsx("strong", { children: "API Gateway URL:" }), " ", API_URL] }), _jsxs("p", { className: "text-sm text-gray-600", children: [_jsx("strong", { children: "WebSocket URL:" }), " ", WS_URL] })] }), _jsx("div", { className: "mb-4 p-4 bg-amber-50 rounded-lg", children: _jsxs("p", { className: "text-lg font-semibold mb-2", children: ["Estado: ", status] }) }), response && (_jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Respuesta:" }), _jsx("pre", { className: "bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-xs", children: JSON.stringify(response, null, 2) })] })), _jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Tests B\u00E1sicos" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx("button", { onClick: testGateway, disabled: loading, className: "px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-400 transition-colors font-medium", children: loading ? '⏳ Probando.. .' : '🌐 Test Gateway' }), _jsx("button", { onClick: testChatEndpoint, disabled: loading, className: "px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-medium", children: loading ? '⏳ Probando...' : '💬 Test Chat API' })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-3", children: "Tests de WebSocket" }), _jsxs("div", { className: "grid grid-cols-1 md: grid-cols-2 gap-4", children: [_jsx("button", { onClick: testWebSocketWithScript, className: "px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium", children: "\uD83D\uDD0C Test SockJS/STOMP" }), _jsx("button", { onClick: testWebSocketNative, className: "px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm", children: "\uD83E\uDDEA Test WS Nativo (fallar\u00E1)" })] })] })] }), _jsxs("div", { className: "bg-amber-50 border-l-4 border-amber-400 p-4 rounded mb-4", children: [_jsx("h3", { className: "font-semibold mb-2", children: "\uD83D\uDCA1 Explicaci\u00F3n: " }), _jsxs("ul", { className: "list-disc list-inside text-sm space-y-1", children: [_jsxs("li", { children: [_jsx("strong", { children: "SockJS/STOMP:" }), " El m\u00E9todo correcto para tu servidor"] }), _jsxs("li", { children: [_jsx("strong", { children: "WS Nativo:" }), " No funcionar\u00E1 porque el servidor usa SockJS"] }), _jsx("li", { children: "El test SockJS/STOMP carga las librer\u00EDas desde CDN (sin problemas de import)" })] })] }), _jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold mb-2", children: "\uD83D\uDCDD Notas:" }), _jsxs("ul", { className: "list-disc list-inside text-sm space-y-1", children: [_jsx("li", { children: "El Gateway debe estar corriendo en puerto 8081" }), _jsx("li", { children: "El microservicio de Chat debe estar corriendo en puerto 8084" }), _jsx("li", { children: "El test \"WS Nativo\" fallar\u00E1 porque el servidor requiere SockJS" }), _jsx("li", { children: "Usa \"Test SockJS/STOMP\" para probar la conexi\u00F3n real" })] })] })] }));
};
export default TestConnection;
