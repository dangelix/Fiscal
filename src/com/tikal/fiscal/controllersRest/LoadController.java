package com.tikal.fiscal.controllersRest;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.tikal.fiscal.dao.ClienteDAO;
import com.tikal.fiscal.dao.CuentaDAO;
import com.tikal.fiscal.dao.EmpresaDAO;
import com.tikal.fiscal.dao.FolioOtDAO;
import com.tikal.fiscal.dao.MovimientoDAO;
import com.tikal.fiscal.dao.NotificacionDAO;
import com.tikal.fiscal.dao.OrdenDeTrabajoDAO;
import com.tikal.fiscal.dao.PagoRecibidoDAO;
import com.tikal.fiscal.dao.RegistroPagoDAO;
import com.tikal.fiscal.security.UsuarioDAO;
import com.tikal.fiscal.util.AsignadorDeCharset;
import com.tikal.fiscal.model.Cliente;
import com.tikal.fiscal.model.Cuenta;
import com.tikal.fiscal.model.Empresa;


@Controller
@RequestMapping(value={"/load"})
public class LoadController {

	
	@Autowired
	OrdenDeTrabajoDAO otdao;	
	
	@Autowired
	EmpresaDAO empresaDao;
	
	@Autowired
	ClienteDAO clientedao;
	
	@Autowired
	PagoRecibidoDAO pagodao;
	
	@Autowired
	RegistroPagoDAO regPagodao;
	
	@Autowired
	UsuarioDAO usuariodao;
	
	@Autowired
	MovimientoDAO movimientodao;
	
	@Autowired
	CuentaDAO cuentadao;
	
	@Autowired
	FolioOtDAO foliodao;
	
	@Autowired
	NotificacionDAO notificaciondao;
	
	
	
	
	@RequestMapping(value = { "/clientes" }, method = RequestMethod.POST, consumes="application/json")
	private void update(HttpServletRequest req, HttpServletResponse res, @RequestBody String json) throws IOException{
		//if(Util.verificarPermiso(re, usuariodao, perfildao, 2,0)){

		AsignadorDeCharset.asignar(req, res);
		System.out.println("----------");
		String[] conceptos = json.split("\n");
	
		for(int i=1; i<conceptos.length; i++){
			String m = conceptos[i];
			m= m.replace("\"\t", "");
			String[] values= m.split("\t");
			System.out.println("----------values0 :"+values[0]);
			System.out.println("----------values1 :"+values[1]);
			System.out.println("----------values2 :"+values[2]);
			System.out.println("----------values3 :"+values[3]);
			System.out.println("----------values4 :"+values[4]);
			System.out.println("----------values5 :"+values[5]);
			System.out.println("----------values6 :"+values[6]);
			System.out.println("----------values7 :"+values[7]);
			System.out.println("----------values8 :"+values[8]);
			System.out.println("----------values9 :"+values[9]);
			Cliente c= new Cliente();			
			c.setNickname(values[0]);
			c.setTipo(values[1]);
			c.setResponsable(Long.valueOf(values[2]));
			c.setIdBrocker(Long.valueOf(values[3]));
			c.setEnabled(true);
			c.setSaldo(Double.parseDouble(values[5]));
			c.setSaldoUSD(Double.parseDouble(values[6]));
			c.setNombre(values[7]);
			c.setApeMaterno(values[8]);
			c.setApePaterno(values[9]);
			
			clientedao.save(c);
//			String vu=values[9];
//			vu=vu.trim();
//			if(vu.contains("$")){
//			vu=vu.replaceAll("[$]", "");
//			vu=vu.replaceAll(",", "");
//			vu=vu.replaceAll("\"", "");
//			vu=vu.trim();
//			}
			
//			fr.setValorUnitario(vu);
//			fr.setIvaIncluido(values[10]);
//			fr.setSerie(values[11]);
//			fr.setFormaPago(values[12]);
//			fr.setMetodoPago(values[13]);
//			fr.setRegimen(values[14]);
//			if(values.length==16){
//				if(values[15].length()>0&& values[15].compareTo("0")!=0){
//					fr.setCuenta(values[15]);
//				}
//			}
//			fr.setProcesada(false);
//			fr.setPos(indice);
//			lista.add(fr);
//			indice++;
////			this.timbrar(fr, req.getSession());
		}
	}
		
		
	@RequestMapping(value = { "/empresas" }, method = RequestMethod.POST, consumes="application/json")
	private void em(HttpServletRequest req, HttpServletResponse res, @RequestBody String json) throws IOException {
		//if(Util.verificarPermiso(re, usuariodao, perfildao, 2,0)){
		System.out.println("----------");
		AsignadorDeCharset.asignar(req, res);
		String[] conceptos = json.split("\n");
		//List<Empresa> lista= new ArrayList<Empresa>();
	//	int indice=facturarenglondao.indice()+1;
		for(int i=1; i<conceptos.length; i++){
			String m = conceptos[i];
			m=m.replaceAll("\r", "");
			String[] values = m.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
			Empresa e= new Empresa();
			
			e.setNombre(values[0]);
			empresaDao.addEmpresa(e);
	
		}
	} 
	
	
	@RequestMapping(value = { "/cuentas" }, method = RequestMethod.POST, consumes="application/json")
	private void ctas(HttpServletRequest req, HttpServletResponse res, @RequestBody String json) throws IOException{
		//if(Util.verificarPermiso(re, usuariodao, perfildao, 2,0)){
		System.out.println("----------");
		AsignadorDeCharset.asignar(req, res);
		String[] conceptos = json.split("\n");
//		List<Cuenta> lista= new ArrayList<Cuenta>();
	//	int indice=facturarenglondao.indice()+1;
		for(int i=1; i<conceptos.length; i++){
			String m = conceptos[i];
			m= m.replace("\"\t", "");
			String[] values= m.split("\t");
//			m=m.replaceAll("\r", "");
//			String[] values = m.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
			System.out.println("----------values0 :"+values[0]);
			System.out.println("----------values1 :"+values[1]);
			System.out.println("----------values2 :"+values[2]);
			System.out.println("----------values3 :"+values[3]);
			System.out.println("----------values4 :"+values[4]);
			System.out.println("----------values5 :"+values[5]);
			System.out.println("----------values6 :"+values[6]);
			//System.out.println("----------values7 :"+values[7]);
			Cuenta c= new Cuenta();			
			c.setBanco(values[0]);
			c.setCuenta(values[2]);
			c.setClabe(values[1]);
			c.setNombre(values[6]);
			c.setEnabled(true);
			c.setIdEmpresa(Long.valueOf(values[4]));
			c.setMoneda(values[5]);
			cuentadao.save(c);;
	
		}
	}
	
	
	
	
	@RequestMapping(value = { "/byeC" }, method = RequestMethod.GET)
	private void del(HttpServletRequest req, HttpServletResponse res) throws IOException{
		//if(Util.verificarPermiso(re, usuariodao, perfildao, 2,0)){
		System.out.println("---ini-------");
		List<Cliente> clientes= clientedao.getAll_();
		for (Cliente c:clientes){
			clientedao.delete(c);
		}
		
		System.out.println("---fin-------");
	}
	
	@RequestMapping(value = { "/byeCtas" }, method = RequestMethod.GET)
	private void delC(HttpServletRequest req, HttpServletResponse res) throws IOException{
		//if(Util.verificarPermiso(re, usuariodao, perfildao, 2,0)){
		System.out.println("---ini-------");
		List<Cuenta> clientes= cuentadao.getAll();
		for (Cuenta c:clientes){
			cuentadao.delete(c);
		}
		
		System.out.println("---fin-------");
	}
	
	@RequestMapping(value = { "/idEmpresa" }, method = RequestMethod.GET)
	private void n(HttpServletRequest req, HttpServletResponse res) throws IOException{
		//if(Util.verificarPermiso(re, usuariodao, perfildao, 2,0)){
		System.out.println("---ini----:");
		List<Cuenta> cuentas= cuentadao.getAll();
		for (Cuenta c:cuentas){
			System.out.println("---ini-----empresa:"+c.getNombre());
			List<Empresa> empresas= empresaDao.buscar(c.getNombre());
			if (empresas.size()==0){
				System.out.println("--entra-");
				Empresa e=new Empresa();
				e.setNombre(c.getNombre());
				empresaDao.addEmpresa(e);
				c.setIdEmpresa(e.getId());
				cuentadao.save(c);
			}else{
			c.setIdEmpresa(empresas.get(0).getId());
			cuentadao.save(c);
//			if (c.getNombre().equals("brocker")){
//				c.setNombre(c.getNickname());
//				clientedao.save(c);
//			}
			}
			
		}
		
		System.out.println("---fin-------");
	}
	
//	@RequestMapping(value = { "/brocker" }, method = RequestMethod.GET)
//	private void n(HttpServletRequest req, HttpServletResponse res) throws IOException{
//		//if(Util.verificarPermiso(re, usuariodao, perfildao, 2,0)){
//		System.out.println("---ini-------");
//		List<Cliente> clientes= clientedao.getAll_();
//		for (Cliente c:clientes){
//			if (c.getTipo().equals("brocker")){
//				c.setNombre(c.getNickname());
//				clientedao.save(c);
//			}
//			
//		}
//		
//		System.out.println("---fin-------");
//	}

}