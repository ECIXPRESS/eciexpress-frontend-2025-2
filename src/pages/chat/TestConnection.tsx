import { useState } from 'react';

const TestConnection = () => {
  const [status, setStatus] = useState<string>('No probado');
  const [response, setResponse] = useState<any>(null);
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
    } catch (error:  any) {
      setStatus('❌ Error de conexión al Gateway');
      setResponse({ error: error.message });
    } finally {
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
      } else {
        const error = await res. text();
        setResponse({ error, status: res.status });
        setStatus(`⚠️ Respuesta: ${res. status}`);
      }
    } catch (error: any) {
      setStatus('❌ Error al conectar con Chat');
      setResponse({ error: error. message });
    } finally {
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
    } catch (error: any) {
      setStatus('❌ Error al iniciar WebSocket');
      setResponse({ error: error.message });
    }
  };

  // ⭐ NUEVO:  Test con script externo (evita problemas de import)
  const testWebSocketWithScript = () => {
    setStatus('🔄 Probando con SockJS/STOMP...');
    setResponse({ log: ['Cargando librerías...'] });

    // Cargar SockJS y STOMP desde CDN
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document. createElement('script');
        script.src = src;
        script. onload = () => resolve();
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
        debug: (str:  string) => {
          console. log('[STOMP]', str);
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
        onStompError: (frame:  any) => {
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

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        🧪 Prueba de Conexión - API Gateway
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            <strong>API Gateway URL:</strong> {API_URL}
          </p>
          <p className="text-sm text-gray-600">
            <strong>WebSocket URL:</strong> {WS_URL}
          </p>
        </div>

        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-lg font-semibold mb-2">Estado: {status}</p>
        </div>

        {response && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Respuesta:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-xs">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}

        {/* Tests básicos */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Tests Básicos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={testGateway}
              disabled={loading}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
            >
              {loading ? '⏳ Probando.. .' : '🌐 Test Gateway'}
            </button>

            <button
              onClick={testChatEndpoint}
              disabled={loading}
              className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-medium"
            >
              {loading ? '⏳ Probando...' : '💬 Test Chat API'}
            </button>
          </div>
        </div>

        {/* Tests de WebSocket */}
        <div>
          <h3 className="font-semibold mb-3">Tests de WebSocket</h3>
          <div className="grid grid-cols-1 md: grid-cols-2 gap-4">
            <button
              onClick={testWebSocketWithScript}
              className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              🔌 Test SockJS/STOMP
            </button>

            <button
              onClick={testWebSocketNative}
              className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm"
            >
              🧪 Test WS Nativo (fallará)
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-4">
        <h3 className="font-semibold mb-2">💡 Explicación: </h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li><strong>SockJS/STOMP:</strong> El método correcto para tu servidor</li>
          <li><strong>WS Nativo:</strong> No funcionará porque el servidor usa SockJS</li>
          <li>El test SockJS/STOMP carga las librerías desde CDN (sin problemas de import)</li>
        </ul>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2">📝 Notas:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>El Gateway debe estar corriendo en puerto 8081</li>
          <li>El microservicio de Chat debe estar corriendo en puerto 8084</li>
          <li>El test "WS Nativo" fallará porque el servidor requiere SockJS</li>
          <li>Usa "Test SockJS/STOMP" para probar la conexión real</li>
        </ul>
      </div>
    </div>
  );
};

export default TestConnection;